import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
    useCreateSummaryMutation,
    useLazyGetSummaryQuery,
} from "../../redux/api/summaryApi";
import { useAppSelector } from "../../redux/hook";
import GeneratedSummary from "./GeneratedSummary";

const CreateSummary = () => {
    const [createSummary, { isLoading }] = useCreateSummaryMutation();
    const [triggerGetSummary] = useLazyGetSummaryQuery();

    const { register, handleSubmit, reset } = useForm();
    const { userId } = useAppSelector((state) => state.auth);

    const [fileContent, setFileContent] = useState("");
    const [originalText, setOriginalText] = useState("");
    const [summaryId, setSummaryId] = useState<string | null>(null);
    const [generatedSummary, setGeneratedSummary] = useState<any>(null);
    const [polling, setPolling] = useState(false);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [showReprompt, setShowReprompt] = useState(false);
    const [newPrompt, setNewPrompt] = useState("");

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            setFileContent(text);
            setOriginalText(text);
        };

        if (file.type === "text/plain") {
            reader.readAsText(file);
        } else {
            toast.error("Only .txt files supported for now");
        }
    };

    const onSubmit = async (data: any) => {
        const content = fileContent || data.text;
        if (!content) return toast.error("Please paste text or upload a file");

        setOriginalText(content);
        setGeneratedSummary(null);
        setLoadingSummary(true);

        try {
            const response = await createSummary({
                originalText: content,
                prompt: data.prompt || "Summarize the content",
                user: userId,
            }).unwrap();

            toast.success("Summary request submitted!");
            setSummaryId(response?.data?._id || null);
            setPolling(true);
            reset();
            setFileContent("");
        } catch (error: any) {
            if (error?.data?.errorSources) {
                error.data.errorSources.forEach((e: any) => toast.error(e.message));
            } else {
                toast.error(error?.data?.message || "Something went wrong");
            }
            setLoadingSummary(false);
        }
    };

    const handleRePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!summaryId || !originalText) return toast.error("No summary ID found");

        setGeneratedSummary(null);
        setLoadingSummary(true);

        try {
            await createSummary({
                originalText,
                prompt: newPrompt,
                user: userId,
            }).unwrap();

            toast.success("Re-prompt submitted!");
            setPolling(true);
            setShowReprompt(false);
        } catch (error: any) {
            if (error?.data?.errorSources) {
                error.data.errorSources.forEach((e: any) => toast.error(e.message));
            } else {
                toast.error(error?.data?.message || "Something went wrong");
            }
            setLoadingSummary(false);
        }
    };

    // Polling every 3s
    useEffect(() => {
        if (!summaryId || !polling) return;

        const interval = setInterval(async () => {
            try {
                const res = await triggerGetSummary(summaryId).unwrap();

                if (res?.data?.status === "completed") {
                    setGeneratedSummary(res.data);
                    setPolling(false);
                    setLoadingSummary(false);
                    clearInterval(interval);
                } else if (res?.data?.status === "failed") {
                    toast.error("Summarization failed.");
                    setPolling(false);
                    setLoadingSummary(false);
                    clearInterval(interval);
                }
            } catch (err) {
                console.error(err);
                toast.error("Polling failed.");
                setPolling(false);
                setLoadingSummary(false);
                clearInterval(interval);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [summaryId, polling]);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4">Create Summary</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <textarea
                    {...register("text")}
                    className="textarea textarea-bordered w-full h-40"
                    placeholder="Paste your content here..."
                />

                <div className="divider">OR</div>

                <input
                    type="file"
                    accept=".txt"
                    className="file-input file-input-bordered w-full"
                    onChange={handleFileUpload}
                />

                <input
                    {...register("prompt")}
                    className="input input-bordered w-full"
                    placeholder="Optional prompt"
                />

                <button className="btn btn-primary w-full" type="submit" disabled={isLoading}>
                    {isLoading ? <span className="loading loading-spinner"></span> : "Generate Summary"}
                </button>
            </form>

            {/*Loading Summary State */}
            {loadingSummary && !generatedSummary && (
                <div className="mt-8 text-center">
                    <span className="loading loading-dots loading-lg text-primary"></span>
                    <p className="text-gray-500 mt-2">Processing your summary...</p>
                </div>
            )}

            {/* Show Final Summary Result */}
            {generatedSummary && (
                <GeneratedSummary
                    generatedSummary={generatedSummary}
                    originalText={originalText}
                    newPrompt={newPrompt}
                    setNewPrompt={setNewPrompt}
                    handleRePrompt={handleRePrompt}
                    showReprompt={showReprompt}
                    setShowReprompt={setShowReprompt}
                />
            )}
        </div>
    );
};

export default CreateSummary;
