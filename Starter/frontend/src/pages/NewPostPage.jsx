import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

// TODO (student): Implement create flow (POST /api/posts).
// Suggested steps:
// 1) Read form values in handleSubmit.
// 2) POST JSON body to /api/posts.
// 3) On success, navigate to /posts/:id.
// 4) Show an error message on failure.
function NewPostPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    setSubmitting(true)
    setError(null)

    // TODO (student): Implement this submit logic.
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(e)
      })
      if (!res.ok) throw new Error('Server error: ' + res.statusText)
      const newPost = await res.json()
      navigate(`/posts/${newPost._id}`)
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="page-title">New post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  )
}

export default NewPostPage
