# Philosophers BackEnd

## About the API

BYOB is an API that provides data about breweries in Denver and the beers that they carry. Users can add data to the API through POST requests, delete data with DELETE requests, and edit data with PUT requests

## /api/philosophers

### **`GET`**

Making an API call to this endpoint returns all philosophers

Data returned for each philosopher includes:

* philosopher id
* philosopher name
* year philosopher was born
* year philosopher died
* creation timestamp
* update timestamp

#### Example of returned JSON:

```
[
  {
    "name": "Nietzsche",
    "born": "1844",
    "died": "1900",
    "works": ['The Birth of Tragedy', 'The Gay Science'],
    "created_at": "2019-06-26 09:46:20.466948-06 ",
    "updated_at": "2019-06-26 09:46:20.466948-06"
  },
  {
    "name": "Plato",
    "born": "428",
    "died": "348",
    "works": ['The Republic', 'The Laws'],
    "created_at": "2019-06-26 09:46:20.467223-06",
    "updated_at": "2019-06-26 09:46:20.467223-06"
  },
  
  {
    "name": "Rousseau",
    "born": "1712",
    "died": "1778",
    "works": ['The Social Contract', 'A Discourse on Inequality'],
    "created_at": "2019-06-26 09:46:20.467495-06",
    "updated_at": "2019-06-26 09:46:20.467495-06"
  }
 ]
  ```
