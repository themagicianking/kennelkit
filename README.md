# Kennelkit

Kennelkit is an app designed to help kennel employees store and organize information on their client and easily check pets in and out of their system. My final project for Techtonica.

## Component List

- [ ] All Owners List
- [x] All Pets List
- [x] Checked In Pets List
- [x] Check In Toggle
-     Props: id, checkedin
- [x] Create Pet Form
- [x] Edit Pet Form
- [x] Homepage
- [x] Navbar
- [x] Owner Creation Form
- [ ] Owner Item
-     Props: owner
- [ ] Owner List View
-     Props: list
- [ ] Owner Profile
- [x] Pet Creation Form
- [x] Pet Item
-     Props: pet
- [x] Pet List View
-     Props: list
- [x] Pet Profile

## Testing

- [x] All components: test that they are being rendered
- [x] Pet Item: Test that dog icon renders for dogs and cat icon render for cats
- [x] Pet Item: Test that the sex icon is being rendered correctly
- [x] Pet Stats: Test that dog icon renders for dogs and cat icon renders for cats
- [x] Pet Stats: Test that sex icon is being rendered correctly
- [x] Pet Stats: Test that altered string renders correctly in all combinations
- [x] Pet Profile Icon Bar: Test that check in icon is only rendered if pet is checked in and correct stay type icon is rendered
- [x] Pet List View: Test that the list view correctly renders individual items OR a message indicating that there are no items in the list
- [x] Pet Item: Test that links are being generated for each item
- [ ] Create Pet Form: Test that when no species is selected, breeds are disabled, when cats are selected, cat breeds are rendered, and when dogs are selected, dog breeds are rendered
- [ ] Edit Pet Form: Test that all default information renders

## Saving, Sending, and Updating Data

- Each time a form is filled out, a post request will be sent to the server and will create either a new pet row or a new owner row.
- Each time a pet profile or owner profile is edited, a put request will be sent to the server and will update the row by id.
- Each time a pet profile or owner profile is deleted, a delete request will be sent to the server and will delete the row by id.
- To retrieve information on both a pet and an owner, tables will be joined where the id row for owners match the pet row "owner ids"
- Each time a list or profile view is rendered, a get request will be sent to the server to retrieve an owner or pet by id
- For the search function, get requests will be made based on the filter criteria (phone number, breed, etc)

## Stretch Goals & Extra Features (By Theme & Priority Level)

- ### Owner Profile Theme
-     *Ability to add owner to the database*
-     *Ability to view owner's profile*
-     *Ability to view all owners in the system*
-     *Ability to edit owner's profile*
-     Ability to delete owner
-     Ability to search for owner by filter criteria
- ### Boarding Theme
- ### Feeding Theme
-     *Ability to add feeding schedule to pet profile*
-     *Ability to add meals to pet history*
-     Ability to generate a feeding schedule for all checked in pets
- ### Medication Theme
-     *Ability to add medication schedule to pet profile*
-     *Ability to add medication to pet history*
-     Ability to generate a medication schedule for all checked in pets
- ### Vaccination Theme
- ### Reservation Theme

## Project Schedule

### Week One (10/14/24 - 10/18/24)

|         | Monday | Tuesday                            | Wednesday                      | Thursday                           | Friday                               |
| ------- | ------ | ---------------------------------- | ------------------------------ | ---------------------------------- | ------------------------------------ |
| Story 1 | Off    | View pet profile (individual view) | View pets currently checked in | Add breed to pet profile           | Create an owner profile              |
| Story 2 | Off    | Check in a pet for the day         | View pet profiles (list view)  | Add additional info to pet profile | Add additional info to owner profile |
| Story 3 | Off    | Check out a pet for the day        | Create a pet profile           | Edit pet profile                   | Edit owner profile                   |

### Week Two (10/21/24 - 10/25/24)

|         | Monday                              | Tuesday                     | Wednesday        | Thursday         | Friday                           |
| ------- | ----------------------------------- | --------------------------- | ---------------- | ---------------- | -------------------------------- |
| Story 1 | Clean up any loose ends from week 1 | Owner Theme                 | Work on boarding | Owner Theme      | Plan out feed/medication stories |
| Story 2 | Add testing                         | Add testing for owner theme | Work on boarding | Work on boarding | Feeding Theme                    |
| Story 3 | Add testing                         | Work on boarding            | Work on boarding | Work on boarding | Medication Theme                 |

### Week Three (10/28/24 - 11/3/24)

|         | Monday                                     | Tuesday          | Wednesday                           | Thursday              | Friday                              |
| ------- | ------------------------------------------ | ---------------- | ----------------------------------- | --------------------- | ----------------------------------- |
| Story 1 | Add all unresolved comments to issues & merge in dev-prod-refactor branch | Owner Theme | Clean up styling | Work on documentation | Go back & work on finishing touches |
| Story 2 | Add testing | Clean up styling | Owner Theme | Clean up styling | Go back & work on finishing touches |
| Story 3 | Add testing | Clean up styling | Feed/medication Themes | Clean up styling | Go back & work on finishing touches |

### Week Four

## To Do

- [ ] Record week 1 milestones
- [ ] Add testing
- [x] Refactor schedule
- [ ] Update trello board to match refactored schedule
- [ ] Replace as many custom classes as possible with Material Tailwind classes
