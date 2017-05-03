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
    var ownerName:String?
    var ownerEmail:String?
    var category:Category?
    var medias = [String]()
    var createdAt:String?
    var updatedAt:String?
    var auction:Bool?
    var bidders = [Bidder]()
    
}
struct Bidder
{
    var email:String?
    var bid:NSNumber?
    var date:String?
    init(email:String,bid:NSNumber,date:String)
    {
        self.email = email
        self.bid = bid
        self.date = date
    }
    
}

enum Condition:String
{
    case new = "New"
    case refurbished = "Refurbished"
    case used = "Used"
    case veryGood = "Very Good"
    case good = "Good"
    case acceptable = "Acceptable"
}

enum Category:String
{
    case electronics = "Electronics"
    case books = "Books"
    case bikes = "Bikes"
    case skateBoards = "Video Games"
    case bags = "Bags"
    case everythihngelse = "Misc"
}
