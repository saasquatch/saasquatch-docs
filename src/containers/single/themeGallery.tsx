import React, { useState } from "react";
import { useRouteData } from "react-static";

import PageHeader from "../../components/PageHeader";

const themeGallery = {
  Chipolo: {
    name: "Chipolo",
    types: ["embedded"],
    image: "Chipolo_Widget_Example.png",
    isLive: true,
  },
  "Chipolo Email": {
    name: "Chipolo Email",
    types: ["email"],
    image: "Chipolo_Email_Example.png",
    isLive: true,
  },
  Parkwhiz: {
    name: "Parkwhiz",
    types: ["popup"],
    image: "ParkWhiz_Widget_Example.png",
    isLive: true,
  },
  Tile: {
    name: "Tile",
    types: ["mobile"],
    image: "Tile_Widget_Example.png",
    isLive: true,
  },
  Digicel: {
    name: "Digicel",
    types: ["mobile"],
    image: "Digicel_Widget_Example.png",
    isLive: true,
  },
  "Digicel Email": {
    name: "Digicel Email",
    types: ["email"],
    image: "Digicel_Email_Example.png",
    isLive: true,
  },
  "99-taxis": {
    name: "99 Taxis",
    types: ["mobile"],
    image: "99Taxis_Widget_Example.png",
    isLive: true,
  },
  "99-taxis Email": {
    name: "99 Taxis Email",
    types: ["email"],
    image: "99_Taxis_Email_Example.png",
    isLive: true,
  },
  Bambora: {
    name: "Bambora",
    types: ["embedded"],
    image: "Bambora_Widget_Example.png",
    isLive: true,
  },
  Datacamp: {
    name: "Datacamp",
    types: ["desktop"],
    image: "Datacamp_Widget_Example.png",
    isLive: true,
  },
  Invision_popup: {
    name: "Invision",
    types: ["popup"],
    image: "InVision_Popup_Widget_Example.png",
    isLive: true,
  },
  Invision_embedded: {
    name: "Invision Embedded",
    types: ["embedded"],
    image: "InVision_Embedded_Widget_Example.png",
    isLive: true,
  },
  Invision_email: {
    name: "Invision Email",
    types: ["email"],
    image: "InVision_Email_Example.png",
    isLive: true,
  },
  Tweaknews: {
    name: "Tweaknews",
    types: ["embedded"],
    image: "Tweaknews_Widget_Example.png",
    isLive: true,
  },
  TinyTorch: {
    name: "TinyTorch",
    types: ["embedded"],
    image: "Tiny_Torch_Widget_Example.png",
    isLive: true,
  },
  "TinyTorch Email": {
    name: "TinyTorch Email",
    types: ["email"],
    image: "Tiny_Torch_Email_Example.png",
    isLive: true,
  },
  "Parkwhiz Email": {
    name: "parkwhiz Email",
    types: ["email"],
    image: "Parkwhiz_Email_Example.png",
    isLive: true,
  },
  "Choose Energy Email": {
    name: "Choose Energy Email",
    types: ["email"],
    image: "Choose_Energy_Email_Example.png",
    isLive: true,
  },
  "Panda Email": {
    name: "Panda Email",
    types: ["email"],
    image: "Panda_Email_Example.png",
    isLive: true,
  },
  "Ballpark Email": {
    name: "Ballpark Email Email",
    types: ["email"],
    image: "email-ballpark-referral-done.png",
    isLive: true,
  },
  Kobo_Email_Done: {
    name: "Kobo Email",
    types: ["email"],
    image: "email-kobo-referral-done.png",
    isLive: true,
  },
  "Kobo Email": {
    name: "Kobo Email",
    types: ["email"],
    image: "email-kobo-share.png",
    isLive: true,
  },
  "Snapwire Email": {
    name: "Snapwire Email",
    types: ["email"],
    image: "email-snapwire-referral-started.png",
    isLive: true,
  },
  "Norad Email": {
    name: "Norad Email",
    types: ["email"],
    image: "Norad_Email_Example.png",
    isLive: true,
  },
  "Order-In Widget": {
    name: "Order-In Widget",
    types: ["embedded"],
    image: "Order-In_Widget_Example.png",
    isLive: true,
  },
  "Griddy Widget": {
    name: "Order-In Widget",
    types: ["embedded"],
    image: "Griddy_Widget_Example.png",
    isLive: true,
  },
  "Griddy Email": {
    name: "Order-In Email",
    types: ["email"],
    image: "Griddy_Email_Example.png",
    isLive: true,
  },
  "Hungry Harvest Widget": {
    name: "Hungry Harvest Widget",
    types: ["embedded"],
    image: "Hungry_Harvest_Widget_Example.png",
    isLive: true,
  },
  "Hungry Harvest Email": {
    name: "Hungry Harvest Email",
    types: ["email"],
    image: "Hungry_Harvest_Email_Example.png",
    isLive: true,
  },
  "Withlocals Email": {
    name: "Withlocals Email",
    types: ["email"],
    image: "Withlocals_Email_Example.png",
    isLive: true,
  },
  "QVC Widget": {
    name: "QVC Widget",
    types: ["embedded"],
    image: "QVC_Widget_Example.png",
    isLive: true,
  },
  "QVC Email": {
    name: "QVC Email",
    types: ["email"],
    image: "QVC_Email_Example.png",
    isLive: true,
  },
};

const id = "themegallery-ljbv11g121h";

export default function render() {
  const { entry } = useRouteData();
  const [filter, setFilter] = useState<string>(null);
  const isChecked = (type:string) => filter === type ? "is-checked" : ""
  return (
    <PageHeader {...entry}>
      <>
        <div className="integration-gallery-button-group filters-integration-gallery-button-group">
          <button
            className={"integration-gallery-button " + isChecked(null)}
            // data-filter="*"
            onClick={() => setFilter(null)}
          >
            All
          </button>
          <button
            className={"integration-gallery-button " + isChecked("popup")}
            //data-filter=".popup"
            onClick={() => setFilter("popup")}
          >
            Popup Widget
          </button>
          <button
            className={"integration-gallery-button " + isChecked("embedded")}
            // data-filter=".embedded"
            onClick={() => setFilter("embedded")}
          >
            Embedded Widget
          </button>
          <button
            className={"integration-gallery-button " + isChecked("mobile")}
            // data-filter=".mobile"
            onClick={() => setFilter("mobile")}
          >
            Mobile Widget
          </button>
          <button
            className={"integration-gallery-button " + isChecked("email")}
            // data-filter=".email"
            onClick={() => setFilter("email")}
          >
            Emails
          </button>
        </div>

        <div className="grid" id={id}>
          {Object.keys(themeGallery)
            .map((key) => {
              const galleryItem = themeGallery[key];
              return galleryItem;
            })
            .filter((item) => !filter || item.types?.includes(filter))
            .map((galleryItem) => {
              if (!galleryItem.isLive) return <div />;

              return (
                <div className={"gallery-item " + galleryItem.types.join(" ")}>
                  <a
                    className="docs-lightbox"
                    href={"/assets/images/theme-gallery/" + galleryItem.image}
                    data-lightbox="example-set"
                  >
                    <img
                      className="docs-lightbox"
                      src={"/assets/images/theme-gallery/" + galleryItem.image}
                      alt={galleryItem.name}
                    />
                    <div>
                      <i className="fa fa-eye"></i> Preview
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </>
    </PageHeader>
  );
}
