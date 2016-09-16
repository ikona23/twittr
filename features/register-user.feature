Feature: Register and login user feature

  @watch
  Scenario: I want to register as a Twittr user so I can log in
    Given I am viewing the page at "/login"
    When I click the link "here" (Register here)
    Then I can see an input with value "username"
    And I can see an input with value "email"
    And I can see an input with value "password"
    When I enter "new_user123" into the "username" input
    And I enter "user123@user123.com" into the "email" input
    And I enter "password456" into the "password" input
    When I click on the input with value "register"
    Then I am viewing the page "/login"
    Then I enter "new_user123" into the input named "username"
    And I enter "user123@user123.com" into the input named "password"
    When I click on the input with value "Log in"
    Then I can see the p item with value "Welcome new_user123, email: user123@user123.com"
