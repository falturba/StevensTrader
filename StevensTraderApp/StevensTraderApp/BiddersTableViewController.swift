//
//  BiddersTableViewController.swift
//  StevensTraderApp
//
//  Created by Fawaz AlTurbaq on 5/2/17.
//  Copyright © 2017 Fawaz Alturbaq. All rights reserved.
//

import UIKit

class BiddersTableViewController: UITableViewController {
    var product:Product?
    let cellId = "bidderCell"
    override func viewDidLoad() {
        super.viewDidLoad()


    }
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return product!.bidders.count
    }
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId, for: indexPath) as! BidderCell
        let bidder = product?.bidders[indexPath.row]
        cell.email.text = bidder?.email
        cell.time.text = bidder?.date
        cell.bid.text = (bidder?.bid?.stringValue)!+"$"
        return cell
    }
}

class BidderCell:UITableViewCell
{
    
    @IBOutlet weak var time: UILabel!
    @IBOutlet weak var email: UILabel!
    @IBOutlet weak var bid: UILabel!
    override func awakeFromNib()
    {
        super.awakeFromNib()
    }
    override func setSelected(_ selected: Bool, animated: Bool)
    {
        super.setSelected(selected, animated: animated)
    }
    
    
}





