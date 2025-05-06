Feature: Sale platform homepage

  @banner
  Scenario: Check display banner at the top
    Given I visit the homepage
    Then I should see the banner displayed correctly

  @banner
  Scenario: Check click "Bắt đầu ngay" button
    Given I visit the homepage
    Then I click on the "Bắt đầu ngay" button
    Then I should navigate to new tab with url "https://one.hsc.com.vn/" in case not login

  @login
  Scenario Outline: Login client SP
    Given I visit the homepage
    Then I login with "<username>" and "<password>" and "<otp>"

    Examples:
      | username   | password | otp    |
      | 011C862206 | 123456   | 123456 |

  @menu
  Scenario Outline: Sidebar should display menu item "<menu>"
    Given I visit the homepage
    Then I should see the menu item "<menu>"

    Examples:
      | menu                            |
      | Tư vấn viên chuyên gia          |
      | Phòng giao dịch                 |
      | Phân tích giao dịch             |
      | Bình luận danh mục đầu tư       |
      | Quản lý giao dịch sao chép      |
      | Tư vấn thông minh               |
      | Hành trình đầu tư               |
      | Market Timing                   |
      | Danh mục đầu tư                 |
      | Phân tích doanh nghiệp/Cổ phiếu |
      | Tổng hợp báo cáo                |
      | HSC Videos                      |
      | Marketing                       |
      | Sản phẩm & Dịch vụ              |
      | News & Blog                     |
      | Sự kiện                         |
      | Tài khoản & Giao dịch           |
      | Cài đặt tài khoản               |
      | Đăng ký gói                     |


  @iphone13
  Scenario: Check display banner at the top
    Given I visit the homepage
    Then I should see the banner displayed correctly


  @ipad
  Scenario: Check display banner at the top
    Given I visit the homepage
    Then I should see the banner displayed correctly