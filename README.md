# Kennelkit

Kennelkit is an app designed to help kennel employees store and organize information on their client and easily check pets in and out of their system. My final project for Techtonica.

## Component List
- [x] Pet Profile Modal 
-     Props: pet name, species, breed, sex, altered/unaltered, birthday, weight, physical description, owner, checked in/out
- [ ] Owner Profile Modal 
-     Props: owner name, phone number, email, emergency contact name, emergency contact phone, emergency contact email, pets
- [x] Pet Creation Modal Form 
- [x] Owner Creation Modal Form 
- [x] List View 
-     Props: array of pets or owners
- [x] Pet Item
-     Props: pet name, species, sex, altered/unaltered, checked in/out
- [ ] Owner Item
-     Props: owner name, phone number, pets

## Testing
- Test that all components are being rendered
- Test that the pet profile renders all information passed through props and no required information is undefined
- Test that dog icon renders for dogs and cat icon render for cats
- Test that sex icon and altered string renders correctly in all combinations
- Test that check in icon is only rendered if pet is checked in and correct stay type icon is rendered
- Test that the owner profile renders all information passed through props and no required information is undefined
- Test that the list view correctly renders individual items OR a message indicating that there are no items in the list
- Test that the pet item renders all information passed through props and no required information is undefined
- Test that the owner item renders all information passed through props and no required information is undefined

## Saving, Sending, and Updating Data
- Each time a form is filled out, a post request will be sent to the server and will create either a new pet row or a new owner row.
- Each time a pet profile or owner profile is edited, a put request will be sent to the server and will update the row by id.
- Each time a pet profile or owner profile is deleted, a delete request will be sent to the server and will delete the row by id.
- To retrieve information on both a pet and an owner, tables will be joined where the id row for owners match the pet row "owner ids"
- Each time a list or profile view is rendered, a get request will be sent to the server to retrieve an owner or pet by id
- For the search function, get requests will be made based on the filter criteria (phone number, breed, etc)

## Project Schedule

### Week One (10/14/24 - 10/18/24)

|| Monday | Tuesday | Wednesday | Thursday | Friday |
| - | ------ | ------- | --------- | -------- | ------ |
| Story 1 | Off | View pet profile (individual view) | View pets currently checked in | Add breed to pet profile | Create an owner profile |
| Story 2 | Off | Check in a pet for the day | View pet profiles (list view) | Add additional info to pet profile | Add additional info to owner profile | 
| Story 3 | Off | Check out a pet for the day | Create a pet profile | Edit pet profile | Edit owner profile |

### Week Two

|| Monday | Tuesday | Wednesday | Thursday | Friday |
| - | ------ | ------- | --------- | -------- | ------ |
| Story 1 | Clean up any loose ends from week 1 | Plan out feasible boarding stories | Work on boarding | Work on boarding | Plan out vaccine stories |
| Story 2 | Add feeding schedule to pet profile | Work on boarding | Work on boarding | Work on boarding | Work on vaccines |
| Story 3 | View owner profile (individual view) | Work on boarding | Work on boarding | Work on boarding | Work on vaccines |

### Week Three

|| Monday | Tuesday | Wednesday | Thursday | Friday |
| - | ------ | ------- | --------- | -------- | ------ |
| Story 1 | Finish any functionality left for boarding | Clean up styling | Go back & work on finishing touches | Work on documentation | Go back & work on finishing touches |
| Story 2 | Finish any functionality left for vaccines | Clean up styling | Go back & work on finishing touches | Work on documentation | Go back & work on finishing touches |
| Story 3 | Continue 1 & 2 | Clean up styling | Go back & work on finishing touches | Work on documentation | Go back & work on finishing touches |

## To Do
- Replace as many custom classes as possible with Material Tailwinf classes [  ]