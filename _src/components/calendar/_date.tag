<riot-date class="date {className}">
    <i class="riot-date--bg" if={!replaceWithInnerHTML}></i>
    <span if={!replaceWithInnerHTML}>{opts.date.d}</span>
    <script>
        <!-- inject: ./date.js -->
    </script>
</riot-date>