//
//
//import UIKit
////import SwiftyJSON
//class Services: NSObject {
//    let serverip = Config.getServerIP()
//    func connect(service:ServicesList) -> Any?
//    {
//        
//        var json:Any? = nil
//        let url = serverip+"/services/"+service.rawValue
//        var urlRequest = URLRequest(url: URL(string: url)!)
//        switch service
//        {
//        case .ChangePassword:
//            urlRequest.httpMethod = "GET"
//        }
//        URLSession.shared.dataTask(with: urlRequest, completionHandler: { (data,response,error) in
//            
//            //if downloading the thumbnail failed
//            if error != nil {
//                print(error!)
//                return
//            }
//            if data != nil
//            {
//                 json = try! JSONSerialization.jsonObject(with: data!, options: [])
//                 print(json!)
//            }
//            
//            
//        }).resume()
//        return json
//    }
//
//}
//
//
//
//enum ServicesList:String
//{
//    case ChangePassword = "changepassword/"
//}
//
//
