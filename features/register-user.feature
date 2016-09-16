Feature: Authentication feature

  @watch
  Scenario: I want to register as a Twittr user so I can log in securely
    Given I am viewing the page at "/login"
    When I click on the link "/register"
    And I can see an input named "email"
    When I enter "new_user777" into the "username" input
    And I enter "user777@user777.com" into the "email" input
    And I enter "password777" into the "password" input
    When I click on the input with value "Register"
    When I enter "new_user777" into the "username" input
    And I enter "password777" into the "password" input
    When I click on the input with value "Log in"
    Then I can see the p item with value "Welcome to new_user777's feed, email: user777@user777.com"
