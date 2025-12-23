Feature: Sale platform login

    @regression
    @staging
    @login_staging
    Scenario Outline: Login client SP
        Given I visit the homepage
        And I login with "<username>" and "<password>" and "<otp>"
        Then I should see the ONE MASS page
        Then I navigate back to ONE Advisory page
        Examples:
            | username   | password | otp    |
            | 011C030272 | 123456   | 123456 |