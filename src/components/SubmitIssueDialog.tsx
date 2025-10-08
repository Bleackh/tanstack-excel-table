'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

interface SubmitIssueDialogProps {
    repoOwner?: string
    repoName?: string
}

export function SubmitIssueDialog({
    repoOwner = 'Bleackh',
    repoName = 'tanstack-excel-table',
}: SubmitIssueDialogProps) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [issueType, setIssueType] = useState<'bug' | 'enhancement'>('bug')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitError(null)
        setSubmitSuccess(false)

        // Construct the GitHub issue URL
        const issueUrl = `https://github.com/${repoOwner}/${repoName}/issues/new`
        const params = new URLSearchParams({
            title: title,
            body: description,
            labels: issueType,
        })

        // Open GitHub issues page in a new tab with pre-filled data
        window.open(`${issueUrl}?${params.toString()}`, '_blank')

        // Reset form
        setIsSubmitting(false)
        setSubmitSuccess(true)

        // Close dialog after a brief moment
        setTimeout(() => {
            setOpen(false)
            setTitle('')
            setDescription('')
            setIssueType('bug')
            setSubmitSuccess(false)
        }, 1500)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Report Issue
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Submit an Issue</DialogTitle>
                        <DialogDescription>
                            Report a bug or request a feature. This will open GitHub with pre-filled
                            information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="issue-type">Issue Type</Label>
                            <div className="flex gap-2">
                                <Badge
                                    variant={issueType === 'bug' ? 'default' : 'outline'}
                                    className="cursor-pointer"
                                    onClick={() => setIssueType('bug')}
                                >
                                    🐛 Bug
                                </Badge>
                                <Badge
                                    variant={issueType === 'enhancement' ? 'default' : 'outline'}
                                    className="cursor-pointer"
                                    onClick={() => setIssueType('enhancement')}
                                >
                                    ✨ Enhancement
                                </Badge>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Brief description of the issue"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Provide details about the issue..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
                                required
                            />
                        </div>
                    </div>
                    {submitError && (
                        <div className="text-sm text-destructive mb-4">{submitError}</div>
                    )}
                    {submitSuccess && (
                        <div className="text-sm text-green-600 mb-4">
                            Opening GitHub issues page...
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting || !title || !description}>
                            {isSubmitting ? 'Opening...' : 'Open GitHub Issue'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
