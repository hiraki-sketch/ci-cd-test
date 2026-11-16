import { useState, } from 'react'
import './App.css'

type Todo = {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'CI/CDの練習', completed: false },
    { id: 2, title: 'Reactの練習用', completed: false },
    { id: 3, title: 'tailwindcssの練習', completed: false },
  ])
  const [title, setTitle] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTitle = title.trim()
    if (!newTitle) return

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: Math.max(0, ...currentTodos.map((todo) => todo.id)) + 1,
        title: newTitle,
        completed: false,
      },
    ])
    setTitle('')
  }

  const handleDelete = (id: number) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
    if (editId === id) {
      setEditId(null)
      setEditTitle('')
    }
  }

  const handleSaveEdit = (id: number) => {
    const newTitle = editTitle.trim()
    if (!newTitle) return

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      ),
    )
    setEditId(null)
    setEditTitle('')
  }

  return (
    <main className="app-shell">
      <section className="todo-card" aria-labelledby="page-title">
        <header className="page-header">
          <p className="eyebrow">MY TASKS</p>
          <h1 id="page-title">やることリスト</h1>
          <p className="page-description">今日やることを整理しましょう。</p>
        </header>

        <form className="add-form" onSubmit={handleSubmit}>
          <input
            className="todo-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="新しいタスクを入力..."
            aria-label="追加するTodo"
          />
          <button className="button button-primary" type="submit">
            追加する
          </button>
        </form>

        <div className="list-heading">
          <h2>タスク一覧</h2>
          <span className="task-count">{todos.length}件</span>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div className="todo-row" key={todo.id}>
              {editId === todo.id ? (
                <div className="edit-controls">
                  <input
                    className="todo-input edit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    aria-label="Todoを編集"
                  />
                  <button
                    className="button button-primary"
                    type="button"
                    onClick={() => handleSaveEdit(todo.id)}
                  >
                    保存
                  </button>
                  <button
                    className="button button-quiet"
                    type="button"
                    onClick={() => {
                      setEditId(null)
                      setEditTitle('')
                    }}
                  >
                    キャンセル
                  </button>
                </div>
              ) : (
                <div className="todo-content">
                  <span className="todo-marker" aria-hidden="true" />
                  <span className="todo-title">{todo.title}</span>
                  <div className="todo-actions">
                    <button
                      className="button button-quiet"
                      type="button"
                      onClick={() => {
                        setEditId(todo.id)
                        setEditTitle(todo.title)
                      }}
                    >
                      編集
                    </button>
                    <button
                      className="button button-delete"
                      type="button"
                      onClick={() => handleDelete(todo.id)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {todos.length === 0 && (
            <p className="empty-message">
              タスクはありません。新しいタスクを追加しましょう。
            </p>
          )}
        </div>
      </section>
      <p className="page-footer">小さな一歩から、ひとつずつ。</p>
    </main>
  )
}

export default App
