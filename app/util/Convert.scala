package util


object Convert {
    
    val pegdown = new org.pegdown.PegDownProcessor()
    
    def markdownToHtml(rawMd: String){
        val htmlStr = pegdown.markdownToHtml(rawMd)
        play.api.templates.Html(htmlStr)
    }
    
}