//
//  Item.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 4/7/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit

class Product: NSObject {
    var title:String?
    var condition:Condition?
    var price:NSNumber?
    var desc:String?
    var thumbnailUrl:String?
    var id:String?
}

//["New","Refurbished","Used","Very Good","Good","Acceptable"]
enum Condition:String
{
    case new = "New"
    case refurbished = "Refurbished"
    case used = "Used"
    case veryGood = "Very Good"
    case good = "Good"
    case acceptable = "Acceptable"
}
