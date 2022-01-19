import {useEffect, useState, ChangeEvent} from 'react'

interface TagsHookOutputI {
    tags: string[] 
    addTag: (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void
    deleteTag: (idx: number) => void
}

export const useTagList = (initTags?: string[]): TagsHookOutputI => {

    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        if (initTags) {
            setTags(initTags)
        }
    }, [initTags])

    function addTag(e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) {
        const value = e.target.value
        if (typeof(value) === 'string') {
            setTags([...tags, value])
        }
    }
    function deleteTag(idx: number) {
        const newTagList = tags.filter((tag, i) => i !== idx)
        setTags(newTagList)
    }

    return { tags, addTag, deleteTag }
}