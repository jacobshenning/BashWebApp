---
layout: default
title: Blog
permalink: /blog
---

<h1> What a Nice Blog </h1>

<p> Yeah, I am saying so myself, but trust me, it is a nice blog. </p>

<div class="posts">
    {% for post in site.posts %}
        <article class="post">

            <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

            <div class="entry">
                {{ post.excerpt }}
                <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Continue reading...</a>
            </div>

        </article>
    {% endfor %}
</div>
