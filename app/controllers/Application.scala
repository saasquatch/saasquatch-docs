package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }
  
  def robots = Action {
      if(Play.current.configuration.getBoolean("application.robots").getOrElse(false)){
          Redirect(routes.Assets.at("yes-robots.txt"))
      }else{
          Redirect(routes.Assets.at("no-robots.txt"))
      }
  }
  
  // Handles trailing slashes... http://stackoverflow.com/questions/13189095/play-framework2-remove-trailing-slash-from-urls
  def untrail(path: String) = Action { 
        MovedPermanently("/" + path)
  }

  
  def page(slug:String) = Action {
    slug match {
        case "how-it-works"  => Ok(views.html.howItWorks())
        
        case "braintree"  => Ok(views.html.braintree())
        case "recurly"  => Ok(views.html.recurly())
        case "stripe"  => Ok(views.html.stripe())
        case "zuora"  => Ok(views.html.zuora())

        case "app-integration"  => Ok(views.html.appIntegration())

        case "squatchjs"  => Ok(views.html.squatchjs())

        case "api"  => Ok(views.html.apiIntroduction())
        case "api/authentication"  => Ok(views.html.apiAuthentication())
        case "api/errors"  => Ok(views.html.apiErrors())
        case "api/webhooks"  => Ok(views.html.apiWebhooks())

        case "bestpractices/buttons"  => Ok(views.html.buttonsBestPractices())
        case "bestpractices/speed"  => Ok(views.html.pageSpeedBestPractices())
        case "bestpractices/testing"  => Ok(views.html.testingBestPractices())
        case "bestpractices/common-pitfalls"  => Ok(views.html.commonPitfallsBestPractices())
        
        case "faq"  => Ok(views.html.faqGeneral())
        case "faq/pricing"  => Ok(views.html.faqPricing())
        
        case "getting-started"  => Redirect("/")
        case "faq/general"  => Redirect("/faq")
        case "pricing"  => Redirect("/faq/pricing")
        
        case "contact"  => Redirect("http://www.referralsaasquatch.com/contact-us/")
        case "about"  => Redirect("http://www.referralsaasquatch.com/about-us/")

        case _ => NotFound(views.html.notFound())
    }
  }

}