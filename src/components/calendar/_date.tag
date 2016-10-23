<riot-date>
    <i class="riot-date--animation" if={!replaceWithInnerHTML}></i>
    <span if={!replaceWithInnerHTML}>{opts.date.d}</span>
    <script>
        <!-- inject: ./date.js -->
    </script>
</riot-date>