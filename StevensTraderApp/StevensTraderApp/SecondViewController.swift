//
//  SecondViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 2/11/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//
import Alamofire
import UIKit

class SecondViewController: UIViewController {
    @IBOutlet weak var name: UITextField!
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    typealias JSONStandard = Dictionary<String, AnyObject>
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    func checkTextField(type:String) -> Bool
    {
        let regex:NSRegularExpression!
        let input:String!
        do
        {
            switch(type){
            case "email":
                regex = try NSRegularExpression(pattern: "^[a-zA-Z]+[a-zA-Z]*$")
                input = email.text!
                break
            case "name":
                regex = try NSRegularExpression(pattern: "^[a-zA-Z]+[a-zA-Z]*$")
                input = name.text!
                break
            case "password":
                regex = try NSRegularExpression(pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")
                input = password.text!
                break
            default:
                print ("error type")
                return false
            }
            let matches = regex.matches(in: input, options:[], range:NSRange(location:0,length:input.utf16.count))
            if (matches.count>0){
                return true
            }
            else{
                return false
            }
        }catch{
            print("wrong regular expression")
            return false
        }
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func signup(_ sender: UIButton) {
        if(checkTextField(type:"email"))
        {
            if(checkTextField(type:"name"))
            {
                if(checkTextField(type:"password")){
                    let emailText = email.text!+"@stevens.edu"
                    let nameText = name.text!
                    let passwordText = password.text!
                    let url = URL(string: "http://localhost:3000/services/signup")!
                    var request = URLRequest( url:url)
                    request.httpMethod = "POST"
                    let parameters: [String: String] = [
                        "type" : "register" as String,
                        "name" : nameText as String,
                        "email" : emailText as String,
                        "password":passwordText as String
                    ]
                    request.httpBody = try! JSONSerialization.data(withJSONObject: parameters)
                    
                    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                    
                    Alamofire.request(request).responseJSON(completionHandler:{ response in
                            switch response.result {
                            case .failure(let error):
                                print(error)
                                let alert = UIAlertController(title: "Error", message: "Error in connecting to ther server. Please try again later", preferredStyle: UIAlertControllerStyle.alert)
                                alert.addAction(UIAlertAction(title: "Click", style: UIAlertActionStyle.default, handler: nil))
                                self.present(alert, animated: true, completion: nil)
                                if let data = response.data, let responseString = String(data: data, encoding: .utf8) {
                                    print(responseString)
                                }
                            case .success(_):
                                let result = response.result
                                var msg = ""
                                if let dict = result.value as? JSONStandard{
                                    msg = dict["msg"] as! String
                                }
                              
                                let alert = UIAlertController(title: "message", message:msg, preferredStyle: UIAlertControllerStyle.alert)
                                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                                self.present(alert, animated: true, completion: nil)
                            }
                            
                    })
                }
                else {
                    let alert = UIAlertController(title: "Wrong Password", message: "Password has to be minimum 8 characters, at least 1 Alphabet and 1 Number", preferredStyle: UIAlertControllerStyle.alert)
                    alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                    self.present(alert, animated: true, completion: nil)
                }
                
            }
            else {
                let alert = UIAlertController(title: "Wrong Name", message: "Name has to be letters only", preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                self.present(alert, animated: true, completion: nil)
            }
            
        }
        else {
            let alert = UIAlertController(title: "Wrong Email", message: "Email has to be letters only", preferredStyle: UIAlertControllerStyle.alert)
            alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
            self.present(alert, animated: true, completion: nil)
        }
    }
    
    
}
