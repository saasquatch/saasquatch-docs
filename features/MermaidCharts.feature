@owner:logan
@author:alex.mcmillan
Feature: Mermaid Charts

	Defines the behaviour of Mermaid charts used in api/webhooks and api/webhooks/security

	Scenario: Valid Mermaid markup produces a valid chart
		Given the following markup is included in a webhooks.md docs page
			"""
			```mermaid
			graph TD

			A[Receive Webhook]
			B[Check resourceVersion<br>from webhook body]
			C[Incoming >= stored value?]
			D[Process webhook<br>Store newer resourceVersion]
			I[Ignore<br>Stale data]
			X[Your Database]

			A-->B-->C

			C--yes-->D
			C--no-->I

			X--load-->B
			D--save-->X
			```
			"""
		Then a Mermaid chart is shown in the correct location on the docs page
		And the chart generated matches the markup
