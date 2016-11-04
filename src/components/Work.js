<p>This page describes my recent work experiences. You can also view my formal resume <a href="/files/resume.pdf">here.</a></p>

<div class="list">
    {% for job in site.data.work %}
        <div class="list-item">
            <div class="list-img" style="background-image:url('{{ job.image }}')"></div>
            <div class="list-text">
                <p>{{ job.description }}</p>
                {% if job.time_start and job.time_stop %}
                    <p>{{ job.time_start }} &nbsp;•&nbsp; {{ job.time_stop }}</p>
                {% endif %}
            </div>
        </div>
    {% endfor %}
</div>