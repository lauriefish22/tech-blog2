{ {> homepage - detail post } }

{ { #if loggedIn } }
<div class="card">
    <h3 class="card-header"></h3>
    <form class="card-body comment-form" id="comment-form">

        <label class="form-label">Comment</label>
        <input id="comment" name="comment-body" class="form-input" />

        <button type="submit" class="btn">Submit</button>
    </form>
</div>
{
    {
        /if}}

        { {> comment post.comments } }

        { { #if loggedIn } }
        <script src="/js/comment.js"></script>
        { { /if}}