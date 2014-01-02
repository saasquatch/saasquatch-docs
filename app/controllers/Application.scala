package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }
  
  def robots = Action {
      if(Play.current.configuration.getString("application.robots") equals "true"){
          Redirect(routes.Assets.at("yes-robots.txt"))
      }else{
          Redirect(routes.Assets.at("no-robots.txt"))
      }
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
        
        case "bestpractices/buttons"  => Ok(views.html.buttonsBestPractices())
        case "bestpractices/speed"  => Ok(views.html.pageSpeedBestPractices())
        case "bestpractices/testing"  => Ok(views.html.testingBestPractices())
        
        case "faq"  => Ok(views.html.faqGeneral())
        case "faq/pricing"  => Ok(views.html.faqPricing())
        
        case "getting-started"  => Redirect("/")
        case "faq/general"  => Redirect("/faq")
        case "pricing"  => Redirect("/faq/pricing")
        
        case "contact"  => Redirect("http://www.referralsaasquatch.com/contact-us/")
        case "about"  => Redirect("http://www.referralsaasquatch.com/about-us/")

        case _ => NotFound
    }
  }

}