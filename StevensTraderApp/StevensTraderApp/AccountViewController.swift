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

    @IBAction func deleteAccount(_ sender: Any) {
        
        let alert = UIAlertController(title: "Are you sure?", message: "This will delete all your items as well", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Yes", style: UIAlertActionStyle.default, handler: {(action:UIAlertAction) in
            self.confirmDeleteAccount()
            KeychainAccess.resetToken()
            KeychainAccess.resetPassword()
            KeychainAccess.resetUsername()
            self.view.window!.rootViewController?.dismiss(animated: true, completion: nil)
        }))
        alert.addAction(UIAlertAction(title: "Cancel", style: UIAlertActionStyle.default, handler:nil))
        self.present(alert,animated: true,completion: nil)
        
        
    }
    
    func confirmDeleteAccount()
    {
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
            return
        }
        
        let parameters:[String:String] = ["email":email.text!]
        let headers: HTTPHeaders = ["authorization":"Bearer "+token!]
        
        var URL = try! URLRequest(url: Config.getServerIP()+"/services/deleteuseraccount", method: .post, headers: headers)
        URL.httpBody = try! JSONSerialization.data(withJSONObject: parameters)
        URL.httpMethod = "POST"
        URL.setValue("application/json", forHTTPHeaderField: "Content-Type")
        Alamofire.request(URL).responseJSON(completionHandler: { response in
            switch response.result {
            case .success( _):
        
                print("ssuccessfully account deleted")
                let alert = UIAlertController(title: "Message", message: "Account and items successfully deleted", preferredStyle: .alert)
                 alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:nil))
                self.present(alert,animated: true,completion: nil)
            case.failure(let err):
                print(err)
                let alert = UIAlertController(title: "Error!", message: "The database connections failed. We have been notified, and we will be working on this soon", preferredStyle: .alert)
                 alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler:nil))
                self.present(alert,animated: true,completion: nil)
                
            }
            
            
        })

    }
}
