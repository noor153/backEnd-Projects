This BackEnd Project Is Mini Social Media Platform 

Where There Is Three users For The Platform (User ,Admin ,superAdmin)

users can Register (signUp) & Login (signIn) on The Platform
& Build Profile & Update Their Information (Profile) & Update password

users Will be Able to 
  Create ,Get ,Update ,Delete Their Posts
    , View News Feed (All Users Post) For Users Whose Account Not Deactivate or Post Blocked By Admin
    , Report Other Posts Every Post Only One Time For Each Post
    , Deactivate Their Account Which Will Be Activated at LogingIn
    & View Advertising 

Admins & superAdmin Will be able to 
    Create ,Get ,Update ,Delete Advertisement
    , View All Posts 
    , Review Report & Take Action To Block Post or Not
    , Block User (Don’t Login Again)
  

superAdmin Will be able to 
    Get Users List
    , Add Other Admins With Role Admin
    , Get Admins List
    , Delete Admins

** superAdmin Inserted Manually First Time In DB With Role superAdmin

Each Input Is Validated By Joi Validation in (Body ,Params & Query)
User Must Be SigningIn & Had A Valid Token To Do Any Task Based on His Role