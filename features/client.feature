Feature: Sale platform homepage


  Scenario: Check display banner at the top
    Given I visit the homepage
    Then I should see the banner displayed correctly

  Scenario: Check click "Bắt đầu ngay" button
    Given I visit the homepage
    Then I click on the "Bắt đầu ngay" button
    Then I should navigate to new tab with url "https://one.hsc.com.vn/" incase not login



# @iphone13
#   Scenario: Check display banner at the top
#     Given I visit the homepage
#     Then I should see the banner displayed correctly


# @ipad 
#   Scenario: Check display banner at the top
#     Given I visit the homepage
#     Then I should see the banner displayed correctly



#   Scenario: Check "Login" and "Register" buttons
#     Given I visit the homepage
#     Then I should see the "Login" button
#     And I should see the "Register" button

#   Scenario: Check app download links
#     Given I visit the homepage
#     Then I should see the "Download on the App Store" button
#     And I should see the "Get it on Google Play" button

#   Scenario: Display left-side menu
#     Given I visit the homepage
#     Then I should see the menu item "Phòng giao dịch"
#     And I should see the menu item "Thời gian thị trường"
#     And I should see the menu item "Đăng ký gói"
