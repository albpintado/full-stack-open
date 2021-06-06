browser->server: HTTP POST ttps://studies.cs.helsinki.fi/exampleapp/new_note_spa
server-->browser: 201 OK status code

note over browser:
browser throw POST request with
input text after submit the form
end note

note over server:
server catch the request and
create the note with the data from
browser request, displayed with the rest of notes
end note