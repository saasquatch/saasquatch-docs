package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }
  
  def page(slug:String) = Action {
    slug match {
        case "testing-best-practices"  => Ok(views.html.testingBestPractices())
        case "page-speed-best-practices" => Ok(views.html.pageSpeedBestPractices())
        case _ => NotFound
    }
  }

}