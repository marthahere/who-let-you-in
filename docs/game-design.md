Personal Project: 

1. Game Premise:
The player is the moderator/supervisor of a fictional neighborhood's online community. 
Their job is to verify the identities of people requesting access to the community and decide whether each applicant is legitimate or impersonating someone else.
The player investigates information from different sources, takes notes, connects people and ultimately chooses Accept or Reject.
The goal is to correctly process as many applicants as possible.

2. Title Screen
Game title
Play
Help
Music: On/Off
AI Assistant: On/Off (coming soon)

Help Page: The Help page can explain the basic game idea without giving away the answers.
For example:
Compare the applicant's age with their birthday.
Check whether dates and timelines make sense.
Compare usernames and account histories.
Look for contradictions between the applicant's claims and official records.
Investigate people connected to the applicant.
Pay attention to messages and digital activity.
Use the notebook to keep track of information.

3. Intro Screen
After pressing Play, the player receives a short introduction:
You have been assigned as a moderator for the [] community server.
Your responsibility is to verify the identities of people requesting access to the community.
Some applicants are legitimate residents. Others may be impersonating someone else.
Review the available information carefully before deciding whether to accept or reject each applicant.

4. Main Gameplay loop
The game uses one continuous applicant-by-applicant loop for V1.
Basic Loop
Applicant arrives. Review applicant information. Investigate available records. 
Search connected people if needed. Take notes. Decide Accept or Reject. Receive feedback.
Move to the next applicant. Repeat until the player reaches a failure condition.

The player has access to a notebook during investigations to write down any important information.

The application may have information such as:
- Name
- Age
- Birthday
- Occupation
- School
- Graduation year
- Username
- Account information
- Reason for joining
- Other personal details
Not every case will use every piece of information.

Example
An applicant might claim:
- Name: Emma Carter
- Age: 19
- School: Bellwood High
- Graduation year: 2025
- Username: EmmaCarter19
- Reason for joining: "My best friend Emma convinced me to join."
The player can then investigate these claims and determine whether they are consistent with the available evidence.

5. Accept / Reject
Accept
Choose Accept when the available evidence supports the applicant's identity and there are no important contradictions.
Reject
Choose Reject when the evidence shows that the applicant's identity or claims are inconsistent enough to be considered suspicious.
Feedback
After each decision, the game gives feedback about whether the decision was correct and the
explanation of the important evidence. The failure/scoring count is also updated.

6. Failure / Scoring System
The player has to balance two risks:
Accepting Fake Applicants
**3 fake applicants accepted = Game Over**
The community server becomes compromised.

Rejecting Legitimate Applicants
**5 legitimate applicants rejected = Game Over**
The community loses credibility because too many real residents are being denied access.

7. Profile / Visual Identity
The game should not require manually drawing a unique portrait for every person.
Procedural Visual Identity
Each person can have a unique computer-generated visual identity.

Possible elements:
- Geometric shapes
- Lines
- Patterns
- Symbols
- Arrangements
- Colors
- Other visual identifiers

The visual identity would be generated from the person's unique internal ID.
The same person should always have the same visual identity whenever they appear.

Possible Gameplay Use:
The visual identity could eventually become another investigation clue.
For example:
Recognizing that two profiles belong to the same person.
Detecting that an account is using a copied or altered identity.
Comparing profiles across different records.

8. Future Expansion
These ideas are not required for V1 but could be added later.

- Multiple Days / Shifts:
Different investigation shifts.
New applicants each day.
Possible progression through the story.

- Increasing Difficulty:
More complicated contradictions.
Multiple connected people.
Larger timelines.
Cases requiring several pieces of evidence.

- Connected Cases:
Information from one case can become relevant later.
Previous applicants or people can return.
Events can connect multiple investigations.

- Recurring Characters:
Important people can appear in multiple cases.
Their records can develop over time.

- Twins / Siblings:
More complex identity cases involving people with similar information.
Shared birthdays, schools or locations.
Different usernames and personal records.

- Possible AI features:
Search through available evidence.
Summarize information.
Point out possible contradictions.
Answer questions about records.
Help navigate information.
The AI should assist the player

9. Investigation System
The investigation system is the main part of the game.
Different cases can use different investigation methods. Not every case should use every method.
Some cases may have one important inconsistency while harder cases may require the player to connect several pieces of evidence.

- A. Age and Birthday
The applicant's stated age should match their birthday and the current date.
Possible inconsistencies:
Age does not match birthday.
Applicant claims to be older or younger than their actual age.
Birthday conflicts with another record.
The player may need to do simple age/date calculations.

- B. School Records
School information can be compared with official records.
Possible inconsistencies:
Applicant attended the wrong school.
Graduation year is incorrect.
Applicant claims to have graduated before they attended.
Applicant claims to have attended school with someone who was not there at the same time.
School dates conflict with another part of their story.
School information can become more useful when combined with relationships.

- C. Timeline Inconsistencies
The player must construct a timeline from accurate records.
Example:
Applicant says they moved away from Bellwood in 2022.
Official records show activity in Bellwood in 2023.
Neither record is false.
The contradiction comes from the applicant's story not matching the timeline.
Possible timeline information:
Moving dates
School attendance
Jobs
Account activity
Relationships
Events
Locations
The challenge is connecting the dates correctly.

- D. Digital Footprint
The applicant can have an online history.
Possible information:
Previous usernames
Old posts
Account activity
Profile history
Connected accounts
Messages
Public activity
The player can compare the applicant's current claims with their previous digital footprint.

- E. Username Changes
Username history can reveal inconsistencies.
Example:
Applicant says they have always used EmmaCarter.
Official account history shows the account previously used EmmaSmith.
Important:
A username change does not automatically mean the applicant is fake.
The player needs to consider when and why the username changed.
Username history becomes more important when combined with other evidence.

- F. Username / Visual Similarity
An impersonating account may use a username that looks very similar to another person's username.
Possible examples:
Similar spelling
Extra characters
Missing characters
Numbers added to the name
Visually confusing characters such as lowercase l and uppercase I
The player needs to compare the exact characters rather than assuming two usernames are the same.
This can introduce the idea of digital impersonation.

- G. Suspicious Messages
Messages can contain clues about an account's behavior.
Possible examples:
Someone asks another user for their email.
Someone asks for a password.
Someone asks for a verification code.
A message tries to convince someone to reveal account information.
These cases introduce concepts such as:
Phishing
Social engineering
Account security
Protecting credentials
Verification codes
The game focuses on recognizing suspicious behavior rather than teaching players how to perform it.

- H. Account Creation History
The account's creation date can be compared with what the applicant claims.
Example:
Applicant says their account has existed for five years.
Official records show the account was created two months ago.
Possible inconsistencies:
Account is newer than claimed.
Applicant claims to have used an account before it existed.
Account history conflicts with another timeline.

- I. Login History / Activity
The player can inspect account activity when relevant.
Possible information:
Login dates
General login locations
Connected devices
Security events
Activity dates
Possible clue:
An applicant claims they were not using an account during a certain period.
Official activity shows the account being used during that period.
Important:
Unusual activity should be treated as a clue, not automatic proof that someone is fake.

- J. Connected People Search
The investigation interface can include a search bar for connected people.
Search System
The player can search for a person's name or username.
Depending on the case:
A person may have no connected people.
A person may have one relevant connection.
A person may have several connections.
Some searches may return no result.
The available search results can vary between cases.

Example
Applicant says:
"My best friend Emma convinced me to join."
The player searches for Emma.
Emma's profile shows:
Lives in another country.
Never attended Bellwood High.
Has no record of living in Bellwood.
This can contradict the applicant's story.
The player then decides whether this contradiction is important enough to affect the final decision.

- K. Relationships
Relationships can connect different profiles and records.
Possible relationships:
Friend
Sibling
Twin
Coworker
Classmate
Neighbor
Relative
Relationships can be used to create more complicated cases.
Example:
Applicant claims someone is their classmate.
The person's school records show they attended a different school.
The player must connect the relationship claim with the school evidence.

- L. Twins
Twins can create difficult identity cases.
Two real people may share:
Birthday
School
Hometown
Similar appearance
Similar usernames
But they still have different:
Names
Account histories
Relationships
Digital activity
Other personal records
The player must determine which person the applicant is actually claiming to be.
This prevents simple clues like a matching birthday from automatically proving someone's identity.