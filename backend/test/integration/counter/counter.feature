Feature: Check counter endpoints

Scenario: Get counter successfully
    Given The database contains initial counter
    When el usuario envía una solicitud GET al endpoint "/counter"
    Then la solicitud debe ser exitosa con un código de respuesta 200
    And el contenido de la respuesta debe ser
    """
    {
        "id":1,
        "count":0
    }
    """

Scenario: Get counter fails if database not initialized
    When el usuario envía una solicitud GET al endpoint "/counter"
    Then la solicitud debe ser exitosa con un código de respuesta 500
    And el contenido de la respuesta debe ser
    """
    {
        "message": "Internal server error",
        "statusCode": 500
    }
    """

Scenario: Increase counter successfully
    Given The database contains initial counter
    When el usuario envía una solicitud GET al endpoint "/counter/1/increase"
    Then la solicitud debe ser exitosa con un código de respuesta 200
    And el contenido de la respuesta debe ser
    """
    {
        "id":1,
        "count":1
    }
    """
    And el counter con id 1 debe haber sido persistido con los valores
    """
    {
        "id":1,
        "count":1
    }
    """

Scenario: Increase counter fails if is not in database
    When el usuario envía una solicitud GET al endpoint "/counter/1/increase"
    Then la solicitud debe ser exitosa con un código de respuesta 500
    Then el contenido de la respuesta debe ser
    """
    {
        "message": "Internal server error",
        "statusCode": 500
    }
    """

    Scenario: Increase counter successfully
    Given The database contains initial counter
    When el usuario envía una solicitud GET al endpoint "/counter/1/decrease"
    Then la solicitud debe ser exitosa con un código de respuesta 200
    And el contenido de la respuesta debe ser
    """
    {
        "id":1,
        "count":-1
    }
    """
    And el counter con id 1 debe haber sido persistido con los valores
    """
    {
        "id":1,
        "count":-1
    }
    """

Scenario: Increase counter fails if is not in database
    When el usuario envía una solicitud GET al endpoint "/counter/1/decrease"
    Then la solicitud debe ser exitosa con un código de respuesta 500
    Then el contenido de la respuesta debe ser
    """
    {
        "message": "Internal server error",
        "statusCode": 500
    }
    """