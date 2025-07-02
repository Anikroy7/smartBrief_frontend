import React from 'react'

export default function GeneratedSummary({ generatedSummary, originalText, newPrompt, setNewPrompt, handleRePrompt, showReprompt, setShowReprompt }: {
    generatedSummary: any,
    originalText: string,
    newPrompt: string,
    setNewPrompt: React.Dispatch<React.SetStateAction<string>>,
    handleRePrompt: (e: React.FormEvent<HTMLFormElement>) => void,
    showReprompt: boolean,
    setShowReprompt: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    return (
        <>
            <div className="mt-10 border rounded-lg p-4 bg-base-100 shadow">
                <h2 className="text-xl font-semibold mb-2">Summary Result</h2>
                <p className="whitespace-pre-wrap">{generatedSummary.summaryText}</p>

                <button
                    className="btn btn-sm btn-outline mt-4"
                    onClick={() => setShowReprompt(true)}
                >
                    Re-prompt Summary
                </button>

                {showReprompt && (
                    <form onSubmit={handleRePrompt} className="mt-4 space-y-3">
                        <label className="label-text font-semibold">Original Text</label>
                        <textarea
                            className="textarea textarea-bordered w-full h-32"
                            value={originalText}
                            readOnly
                        />
                        <input
                            type="text"
                            value={newPrompt}
                            onChange={(e) => setNewPrompt(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Enter new prompt"
                        />
                        <button className="btn btn-sm btn-primary">Submit</button>
                    </form>
                )}
            </div>
        </>
    )
}
