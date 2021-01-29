@owner:lv
@author:am
Feature: Thumbnail popups (success center)

    Use for showing smaller thumbnail images. For example in this article: https://docs.saasquatch.com/features/rewards-fuel-tank/


    Scenario: Popups are automatic
        Given the following markup is included in a contentful article
            """
            <a class="docs-lightbox" href="//images.ctfassets.net/s68ib1kj8k5n/4fw7RtdVxaknRolsxno6Ro/0b36054ab21dfbee5bd4feea99727c2b/Screen_Shot_2019-11-06_at_9.12.28_AM.png" data-lightbox="email-gallery">
            <img class="example-image" src="//images.ctfassets.net/s68ib1kj8k5n/4fw7RtdVxaknRolsxno6Ro/0b36054ab21dfbee5bd4feea99727c2b/Screen_Shot_2019-11-06_at_9.12.28_AM.png" alt="">
            <div><i class="fa fa-eye"></i> Preview</div>
            </a>
            """
        Then the image becomes clickable
        When you click it
        Then a modal is shown with the image
        When you click away or on the X at the top
        Then the modal is hidden