//
//  sellViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 2/22/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit
import Alamofire
import MobileCoreServices
class SellViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate{

    @IBOutlet weak var price: UITextField!
    @IBOutlet weak var itemTitle: UITextField!
    @IBOutlet weak var imageView: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //Looks for single or multiple taps.
//        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action:#selector(UIInputViewController.dismissKeyboard))
//        
//        //Uncomment the line below if you want the tap not not interfere and cancel other interactions.
//        tap.cancelsTouchesInView = false
//        
//        view.addGestureRecognizer(tap)
//        // Do any additional setup after loading the view.
//    }
//    func dismissKeyboard() {
//        //Causes the view (or one of its embedded text fields) to resign the first responder status.
//        view.endEditing(true)
    }
    @IBAction func submit(_ sender: UIButton) {
        var serverip = ""
        do{
              serverip = try Config.getServerIP()
        }catch {
            print("Wrong Server ip in the configuration")
            return
        }
        
        let url = URL(string: "http://"+serverip+"/services/listitem")!
        var request = URLRequest( url:url)
        request.httpMethod = "POST"
        let parameters: [String: String] = [
            "title" : itemTitle.text!,
            "condition" : "New",
            "price" : price.text!,
            ]
        request.httpBody = try! JSONSerialization.data(withJSONObject: parameters)
        
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        Alamofire.request(request).responseJSON(completionHandler:{ response in
            switch response.result {
            case .failure(let error):
                print(error)
                let alert = UIAlertController(title: "message", message:"Error in saving the data, please try again later", preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                self.present(alert, animated: true, completion: nil)

                
            break
                
            case .success(_):
                let alert = UIAlertController(title: "message", message:"Item is sucessfully added", preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
                self.present(alert, animated: true, completion: nil)

                break
                
                
            
            
            
        }
        self.uploadImage()
        }
        )
    }
    func uploadImage() -> Void
    {
        
//        let data = UIImageJPEGRepresentation(imageView.image!, 0.5)
//        
//        Alamofire.upload(.POST, "http://"+serverIP+":3000/services/uploadimage", data: data)
//            .progress { bytesWritten, totalBytesWritten, totalBytesExpectedToWrite in
//                print(totalBytesWritten)
//                
//                // This closure is NOT called on the main queue for performance
//                // reasons. To update your ui, dispatch to the main queue.
//                dispatch_async(dispatch_get_main_queue()) {
//                    print("Total bytes written on main queue: \(totalBytesWritten)")
//                }
//            }
//            .validate()
//            .responseJSON { response in
//                debugPrint(response)
//        }

    }
    @IBAction func back(_ sender: UIBarButtonItem) {
         self.dismiss(animated: false, completion:nil)
    }


    
    @IBAction func addImage(_ sender: UIButton) {
    
        if UIImagePickerController.isSourceTypeAvailable(
            UIImagePickerControllerSourceType.camera) {
            
            let imagePicker = UIImagePickerController()
            
            imagePicker.delegate = self
            imagePicker.sourceType =  UIImagePickerControllerSourceType.camera
            imagePicker.mediaTypes = [kUTTypeImage as String]
            imagePicker.allowsEditing = false
            
            self.present(imagePicker, animated: false,
                         completion: nil)
        }
    }
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        self.dismiss(animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        
        let mediaType = info[UIImagePickerControllerMediaType] as! NSString
        
        self.dismiss(animated: true, completion: nil)
        
        if mediaType.isEqual(to: kUTTypeImage as String) {
            let image = info[UIImagePickerControllerOriginalImage]
                as! UIImage
            
            imageView.image = image
            
            
        }
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
