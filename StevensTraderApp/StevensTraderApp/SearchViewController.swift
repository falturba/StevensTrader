//
//  SearchViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/23/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit

class SearchViewController: UIViewController,UIPickerViewDelegate, UIPickerViewDataSource, UITextFieldDelegate, UITextViewDelegate {
    let categoryList =   ["Any","Electronics","Books","Bikes","Video Games","Bags","Misc"]
    @IBOutlet weak var categoryPicker: UIPickerView!
    @IBOutlet weak var category: UITextField!
    @IBOutlet weak var minSlider: UISlider!
    @IBOutlet weak var maxSlider: UISlider!
    
    @IBOutlet weak var minPrice: UILabel!
    @IBOutlet weak var maxPrice: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.category.allowsEditingTextAttributes = false
        self.category.delegate = self
        maxSlider.value = 5000.0
        minSlider.value = 0
        minPrice.text = String(0)
        maxPrice.text = String(5000)
        category.text = categoryList[0]
    }

    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return categoryList.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return categoryList[row]
    }
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        category.text = categoryList[row]
        categoryPicker.isHidden = true
    }
    func textFieldDidBeginEditing(_ textField: UITextField) {
        self.categoryPicker.isHidden = false
        self.view.bringSubview(toFront: self.categoryPicker)
        category.endEditing(true)
    }
    
    @IBAction func sliderChanged( sender:UISlider)
    {
        if(sender == minSlider)
        {
            minPrice.text = String(Int(minSlider.value))
            if(minSlider.value > maxSlider.value)
            {
                maxSlider.value = minSlider.value
                maxPrice.text = String(Int(maxSlider.value))
            }
            
        }
        if(sender == maxSlider)
        {
            maxPrice.text = String(Int(maxSlider.value))
            if(minSlider.value > maxSlider.value)
            {
                minSlider.value = maxSlider.value
                minPrice.text = String(Int(minSlider.value))
            }
        }
    }
    
    
    @IBAction func search(_ sender: Any) {
        
        performSegue(withIdentifier: "showProductsSegue", sender: self)
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier! == "showProductsSegue"
        {
            if let nav = segue.destination as? UINavigationController {
               if  let table = nav.topViewController as? BuyTableViewController
               {
                
                table.maxPrice = Int(maxPrice.text!)
                table.minPrice = Int(minPrice.text!)
                table.searchCategory = category.text!
                }
                
            }
        }
    }
    

}
