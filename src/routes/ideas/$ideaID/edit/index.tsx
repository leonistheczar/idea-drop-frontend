import { fetchDatabyID, updateIdea } from '@/api/ideas'
import { FloatingInput } from '@/components/FloatingInput'
import { FloatingMessageInput } from '@/components/FloatingMessageInput'
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useBlocker, useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

const ideasQueryOptions = (ideaID: string) =>
  queryOptions({
    queryKey: ['ideas', ideaID],
    queryFn: () => fetchDatabyID(ideaID),
  })

export const Route = createFileRoute('/ideas/$ideaID/edit/')({
  component: RouteComponent,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions(params.ideaID))
  },
})

const UNLOAD_MESSAGE = 'You have unsaved changes. Are you sure you want to leave?'

function RouteComponent() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { ideaID } = Route.useParams()
  const { data: idea } = useSuspenseQuery(ideasQueryOptions(ideaID))

  const [editTitle, setEditTitle] = useState(idea.title)
  const [editSummary, setEditSummary] = useState(idea.summary)
  const [editDesc, setEditDesc] = useState(idea.description)
  const [editTags, setEditTags] = useState(idea.tags.join(', '))

  const isDirty = useMemo(() => {
    const tagsStr = idea.tags.join(', ')
    return (
      editTitle !== idea.title ||
      editSummary !== idea.summary ||
      editDesc !== idea.description ||
      editTags !== tagsStr
    )
  }, [idea, editTitle, editSummary, editDesc, editTags])

  useBlocker({
    shouldBlockFn: () => {
      if (!isDirty) return false
      return !confirm(UNLOAD_MESSAGE)
    },
  })

  useEffect(() => {
    if (!isDirty) return
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = UNLOAD_MESSAGE
      return UNLOAD_MESSAGE
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const { mutateAsync: updateMutate, isPending } = useMutation({
    mutationFn: updateIdea,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] })
      queryClient.setQueryData(['ideas', ideaID], data)
      navigate({ to: '/' })
    },
  })
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!editTitle.trim() || !editSummary.trim() || !editDesc.trim()) {
        alert('Please fill all fields')
        return
      }
      try {
        await updateMutate({
          ideaID,
          title: editTitle,
          summary: editSummary,
          description: editDesc,
          tags: editTags
            .split(',')
            .map((tag: string) => tag.trim())
            .filter((tag: string) => tag !== ''),
        })
      } catch (error) {
        console.error('Failed to update idea')
      }
    }
  
    return (
      <section className="mt-4 bg-gray-50 max-w-4xl mx-auto p-4">
        <div className="w-full max-w-5xl bg-white rounded-xl drop-shadow-md border border-gray-100 container py-6 px-4">
          <h1 className="text-2xl font-semibold mb-6">Update idea</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-y-6 max-w-4xl"
          >
            <FloatingInput
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              label="Idea Title"
              id="idea-title"
              name="idea-title"
              type="text"
            />
            <FloatingInput
              value={editSummary}
              onChange={(e) => setEditSummary(e.target.value)}
              label="Idea Summary"
              id="idea-summary"
              name="idea-summary"
              type="text"
            />
            <FloatingMessageInput
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              label="Idea Description"
              id="idea-desc"
              name="idea-desc"
            />
            <FloatingInput
              value={editTags}
              onChange={(e) => setEditTags(e.target.value)}
              label="Tags (comma separated)"
              id="idea-tags"
              name="idea-tags"
              type="text"
            />
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2 mt-1 p-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 cursor-pointer"
            >
              {isPending ? 'Updating...' : 'Update idea'}
            </button>
          </form>
        </div>
      </section>
    )
  }