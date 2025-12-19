Feature: Sale platform homepage

  # @banner
  # Scenario: Check display banner at the top
  #   Given I visit the homepage
  #   Then I should see the banner displayed correctly

  # @banner
  # Scenario: Check click "Bắt đầu ngay" button
  #   Given I visit the homepage
  #   Then I click on the "Bắt đầu ngay" button
  #   Then I should navigate to new tab with url "https://one.hsc.com.vn/" in case not login

  # @login
  # Scenario Outline: Login client SP
  #   Given I visit the homepage
  #   Then I login with "<username>" and "<password>" and "<otp>"

  #   Examples:
  #     | username   | password | otp    |
  #     | 011C030272 | 123456   | 123456 |

  @menu
  Scenario Outline: Sidebar should display menu item "<menu>"
    Given I visit the homepage
    Then I should see the menu item "<menu>"
    Then the "<menu>" menu should have submenu "<submenu>"

    Examples:
      | menu               | submenu                           |
      | Sản phẩm & Dịch vụ | Tổng quan                        |
      | Sản phẩm & Dịch vụ | Cổ phiếu                          |
      | Sản phẩm & Dịch vụ | Phái sinh                        |
      | Sản phẩm & Dịch vụ | Chứng quyền có bảo đảm       |
      | Sản phẩm & Dịch vụ | ETFs                              |
      | Tư vấn đầu tư      | Giới thiệu hành trình đầu tư |
      | Tư vấn đầu tư      | Thống kê thị trường               |
      | Tư vấn đầu tư      | Lịch sự kiện                      |
      | Tư vấn đầu tư      | Tổng hợp báo cáo                  |
      | Tư vấn đầu tư      | HSC Videos                        |
      | Tư vấn đầu tư      | Nhận định thị trường          |
      | Tư vấn đầu tư      | Phân tích doanh nghiệp          |
      | Tư vấn đầu tư      | Danh mục khuyến nghị           |
      | Tin tức & Sự kiện  | Trang chủ                        |
      | Tin tức & Sự kiện  | Tự học chứng khoán            |
      | Tin tức & Sự kiện  | Tự tin giao dịch                |
      | Tin tức & Sự kiện  | Nghiền ngẫm                     |
      | Tin tức & Sự kiện  | Tổng quan                        |
      | Tin tức & Sự kiện  | C2C - Connecting to Customers     |
      | Tin tức & Sự kiện  | C2C - Connecting to C-level       |

  @congcu
  Scenario: Verify menu Công cụ
    Given I visit the homepage
    Then I verify ONE Trading menu works correctly
    Then I verify ONE Pro menu opens new tab
    Then I verify Winner Trade menu opens new tab


# @iphone13
# Scenario: Check display banner at the top
#   Given I visit the homepage
#   Then I should see the banner displayed correctly


# @ipad
# Scenario: Check display banner at the top
#   Given I visit the homepage
#   Then I should see the banner displayed correctly


# @footer
# Scenario: Check footer display at the bottom
#   Given I visit the homepage
#   Then I should see the footer displayed correctly