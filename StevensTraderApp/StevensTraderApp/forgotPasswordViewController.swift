//
//  forgotPasswordViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/24/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
class forgotPasswordViewController: UIViewController, UINavigationBarDelegate {
    
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    @IBOutlet weak var email: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action:#selector(UIInputViewController.dismissKeyboard))
        tap.cancelsTouchesInView = true
        view.addGestureRecognizer(tap)
        // Do any additional setup after loading the view.
        
        let backButton = UIBarButtonItem(title: "Back", style: .done, target: self, action: #selector(back))
        
        self.navigationItem.leftBarButtonItem = backButton
        
    }
    func dismissKeyboard()
    {
        self.view.endEditing(true)
    }
    func back(_ sender: UIBarButtonItem)
    {
        self.dismiss(animated: true, completion: nil)
    }
    
    func checkEmail () -> Bool
    {
        do
        {
            let regex = try NSRegularExpression(pattern: "^[a-zA-Z]+$")
            let matches = regex.matches(in: email.text!, options:[], range:NSRange(location:0,length:email.text!.utf16.count))
            if (matches.count>0)
            {
                return true
            }
        }
        catch {}
        return false
    }
    @IBAction func send(_ sender: Any)
    {
        if(checkEmail())
        {
           
            self.view.isUserInteractionEnabled = false
            activityIndicator.startAnimating()
            let parameters:[String:String] = ["email":email.text!+"@stevens.edu"]
            let url = URL(string:Config.getServerIP() + "/services/forgotpassword")
            var request = URLRequest(url: url!)
            request.httpMethod = "POST"
            request.httpBody = try! JSONSerialization.data(withJSONObject: parameters)
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            Alamofire.request(request).responseJSON(completionHandler: { response in
                switch response.result {
                case .success( _):
                    let alert = UIAlertController(title: "Message", message: "An email sent to you with a link to confirm", preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    self.present(alert,animated: true,completion: nil)
                    
                case.failure( _):
                    let alert = UIAlertController(title: "Mesage", message: "The server is down, please try again later", preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    self.present(alert,animated: true,completion: nil)
                    
                }
            })
            
        self.view.isUserInteractionEnabled = true
            activityIndicator.stopAnimating()
        
    } else {
    let alert = UIAlertController(title: "Invalid Email", message: "Please enter letters only, and don't include @stevens.edu", preferredStyle: .alert)
    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
    self.present(alert,animated: true,completion: nil)
    }
}
}
