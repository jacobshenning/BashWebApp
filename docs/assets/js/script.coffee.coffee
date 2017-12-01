---
---

# If a link with href hash is selected, call function
$('a[href^="#"]').on 'click.smoothscroll', (e) ->
  # Preventing Default Action
  e.preventDefault()
  # Getting New Position
  newPos = $(@hash).offset().top - 10
  # Scrolling to New Position
  $('html, body').stop().animate {
    'scrollTop': newPos
  }, 500, 'swing'
