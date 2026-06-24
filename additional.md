# Additional Project Information & Reference Guide

This document contains additional technical specifications, database schemas, and configuration tips for managing the Laundry Management System.

---

## 🗄️ Database Table Schemas

Below is a detailed breakdown of the tables defined inside [laundry.sql](file:///d:/BACKUP/projects/PHP project/laundry/laundry.sql):

### 1. `user` Table
Stores authentication details for the administrator.
* **Fields**:
  * `user_id` (INT, Primary Key, Auto Increment)
  * `user_account` (VARCHAR, Username)
  * `user_password` (VARCHAR, MD5 Encrypted Password)

### 2. `laundry_type` Table
Stores different services provided by the laundry shop and their corresponding pricing.
* **Fields**:
  * `laun_type_id` (INT, Primary Key, Auto Increment)
  * `laun_type_desc` (VARCHAR, Description of type e.g., Blanket, Clothes)
  * `laun_type_price` (FLOAT, Price per Kilo)

### 3. `laundry` Table
Tracks active customer orders that are currently being processed.
* **Fields**:
  * `laun_id` (INT, Primary Key, Auto Increment)
  * `customer_name` (VARCHAR, Client name)
  * `laun_priority` (INT, Order queue priority rank)
  * `laun_weight` (INT, Weight in kilograms)
  * `laun_date_received` (TIMESTAMP, Entry timestamp)
  * `laun_claimed` (TINYINT, `0` for active / `1` for claimed/paid)
  * `laun_type_id` (INT, Foreign Key referencing `laundry_type.laun_type_id`)

### 4. `sales` Table
Logs all historical transactions after an order has been claimed and paid for.
* **Fields**:
  * `sale_id` (INT, Primary Key, Auto Increment)
  * `sale_customer_name` (VARCHAR, Client name)
  * `sale_type_desc` (VARCHAR, Service type description)
  * `sale_date_paid` (TIMESTAMP, Payment timestamp)
  * `sale_laundry_received` (DATETIME, Entry timestamp)
  * `sale_amount` (FLOAT, Paid total)

---

## 🔒 Security & Password Management

### Password Hashing
The authentication system checks passwords using MD5 encryption:
```php
$sql = "SELECT * FROM user WHERE user_account = ? AND user_password = ? LIMIT 1";
```
* Default login: `admin` / `admin` (MD5: `21232f297a57a5a743894a0e4a801fc3`)

### Resetting Password Manually
If you ever lock yourself out, you can run this SQL query in your database client (e.g. phpMyAdmin) to reset the password back to `admin`:
```sql
UPDATE `user` SET `user_password` = MD5('admin') WHERE `user_id` = 1;
```

---

## 💡 Frontend Optimization Tips

* **DataTables integration**: Custom tables utilize [DataTables](https://datatables.net/) jQuery plugin for search, sorting, and pagination options.
* **Ajax Requests**: AJAX is configured inside `assets/js/admin.js` to communicate with the PHP controllers in the `data/` folder asynchronously.
