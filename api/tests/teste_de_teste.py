# pip install google-api-python-client

def my_function(x: int) -> int:
    return x * 2

def test_my_function_return_duble_the_input():
    actual_resut =  my_function(x = 5)

    assert actual_resut == 10