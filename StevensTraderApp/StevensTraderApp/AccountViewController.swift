//
//  AccountViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/30/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
class AccountViewController: UIViewController, UINavigationBarDelegate {

    @IBOutlet weak var items: UILabel!
    @IBOutlet weak var email: UILabel!
    @IBOutlet weak var name: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        let backButton = UIBarButtonItem(title: "Back", style: .done, target: self, action: #selector(back))
        let userInfo = Config.getUser()
        email.text = userInfo?.email!
        name.text = userInfo?.name!
        self.navigationItem.leftBarButtonItem = backButton
        
        
        
        
        
        let token = KeychainAccess.getToken()
        if token == nil
        {
            let alert = UIAlertController(title: "Session Expired", message: "The token has been deleted, please login again to get a new token", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: {(action:UIAlertAction) in
                
                KeychainAccess.resetToken()
                KeychainAccess.resetPassword()
                KeychainAccess.resetUsername()
                self.view.window!.rootViewController?.dismiss(animated: true, completion: nil)
            }))
            self.present(alert,animated: true,completion: nil)
            
        }
        
        
        
        let headers: HTTPHeaders = ["authorization":"Bearer "+token!]
        
        var URL = try! URLRequest(url: Config.getServerIP()+"/services/useritemscount", method: .get, headers: headers)
        URL.httpMethod = "GET"
        URL.setValue("application/json", forHTTPHeaderField: "Content-Type")
        Alamofire.request(URL).responseJSON(completionHandler: { response in
            switch response.result {
            case .success( _):
                 guard let json = response.value as? [String:Int],let count = json["count"] else
                 {
                    
                    return
                 }
                 self.items.text = String(count)
            
            case.failure(let err):
                print(err)
                
            }
            
           
        })
        
        
    }
    func back(_ sender: UIBarButtonItem)
    {
        self.dismiss(animated: true, completion: nil)
    }

    @IBAction func chngpass(_ sender: Any) {
        performSegue(withIdentifier: "changePassSegue", sender: self)
    }

}
