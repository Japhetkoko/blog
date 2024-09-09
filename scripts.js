// Function to handle "Like" button clicks
function likePost(button) {
    let likeCount = button.nextElementSibling;
    let count = parseInt(likeCount.textContent.split(' ')[0]);
    count++;
    likeCount.textContent = `${count} Likes`;
}

// Handle Posting Comments
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const commentText = document.getElementById('commentText').value.trim();
    if (commentText === "") {
        alert("Please enter a comment.");
        return;
    }

    const commentSection = document.getElementById('commentSection');

    // Create a new comment element
    const newComment = document.createElement('div');
    newComment.classList.add('comment');

    const commentContent = `
        <p><strong>You:</strong> ${commentText}</p>
        <div class="comment-actions">
            <button class="reply-btn">Reply</button>
            <button class="upvote-btn">Upvote <span class="upvote-count">0</span></button>
        </div>
        <div class="replies"></div>
    `;

    newComment.innerHTML = commentContent;
    commentSection.appendChild(newComment);

    // Clear the textarea
    document.getElementById('commentText').value = "";

    // Add event listeners for the new upvote and reply buttons
    addCommentFunctionality(newComment);
});

// Add functionality to existing and new comments (upvote and reply)
function addCommentFunctionality(commentElement) {
    // Handle Upvotes
    commentElement.querySelector('.upvote-btn').addEventListener('click', function() {
        const count = this.querySelector('.upvote-count');
        count.textContent = parseInt(count.textContent) + 1;
    });

    // Handle Replies
    commentElement.querySelector('.reply-btn').addEventListener('click', function() {
        const replyBox = document.createElement('textarea');
        replyBox.setAttribute('rows', '2');
        replyBox.setAttribute('placeholder', 'Reply here...');
        replyBox.classList.add('reply-box');

        const replySubmit = document.createElement('button');
        replySubmit.textContent = 'Post Reply';

        const repliesContainer = this.parentElement.nextElementSibling; // Replies div
        repliesContainer.appendChild(replyBox);
        repliesContainer.appendChild(replySubmit);

        replySubmit.addEventListener('click', function() {
            if (replyBox.value.trim() !== "") {
                const replyText = document.createElement('p');
                replyText.innerHTML = `<strong>You:</strong> ${replyBox.value}`;
                repliesContainer.appendChild(replyText);
                replyBox.remove();
                replySubmit.remove();
            } else {
                alert("Reply cannot be empty.");
            }
        });
    });
}

// Apply functionality to any existing comments (if present)
document.querySelectorAll('.comment').forEach(addCommentFunctionality);

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Dummy check for example purposes
    if (email === 'user@foodcon.com' && password === 'password123') {
        window.location.href = 'index.html'; // Redirect to homepage
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
});
