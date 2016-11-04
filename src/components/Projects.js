<p>This page describes some projects outside my professional life I've worked which were fun or I'm proud of. Head over to <a href="http://bjacobel.com/activity">my Activity page</a> to see what I'm working on right now.</p>

<div class="list">
  {% for project in site.data.projects %}
      <div class="list-item">
    <div class="list-img" style="background-image:url('{{ project.image }}')"></div>
    <div class="list-text">
      <p class="project-text">{{ project.description }}</p>
      <p>
        {{ project.site_title }} {% if project.site %}<a href="http://{{ project.site }}">{{ project.site }}</a>{% endif %}
        &nbsp;•&nbsp;
                  Source: <a href="https://{{ project.source }}">{{ project.source_title }}</a>
      </p>
    </div>
  </div>
  {% endfor %}
</div>
