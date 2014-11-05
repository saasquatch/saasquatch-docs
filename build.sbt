name := "saasquatch-docs"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  "org.pegdown" % "pegdown" % "1.4.2"
)     

play.Project.playScalaSettings
