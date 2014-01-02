import play.api._
import play.api.mvc._
import play.api.mvc.Results.__

object Global extends GlobalSettings {
  override def onHandlerNotFound(request: RequestHeader): Result = {
    NotFound(views.html.notFound())
  }
}