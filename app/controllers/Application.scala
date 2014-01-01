package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }
  
  def page(slug:String) = Action {
    slug match {
        case "how-it-works"  => Ok(views.html.howItWorks())
        
        case "braintree"  => Ok(views.html.braintree())
        case "recurly"  => Ok(views.html.recurly())
        case "stripe"  => Ok(views.html.stripe())
        case "zuora"  => Ok(views.html.zuora())
        
        case "squatchjs"  => Ok(views.html.squatchjs())
        
        case "bestpractice/buttons"  => Ok(views.html.buttonsBestPractices())
        case "bestpractice/speed"  => Ok(views.html.pageSpeedBestPractices())
        case "bestpractice/testing"  => Ok(views.html.testingBestPractices())
        
        case "faq"  => Ok(views.html.faqGeneral())
        case "faq/pricing"  => Ok(views.html.faqPricing())
        
        case "getting-started"  => Redirect("/")
        case "faq/general"  => Redirect("/faq")

        case _ => NotFound
    }
  }

}