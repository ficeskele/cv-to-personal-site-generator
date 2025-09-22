'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { AppStatus } from '../types';
import { generateWebsiteContent } from '../services/geminiService';
import { extractTextFromPdf } from '../services/pdfParser';
import Loader from '../components/Loader';
import { UploadCloudIcon } from '../components/icons/FileIcons';

const GeneratorPage: React.FC = () => {
    const [cvText, setCvText] = useState('');
    const { setProfileData, status, setStatus, error, setError } = useAppContext();
    const navigate = useNavigate();
    const [pdfFileName, setPdfFileName] = useState<string | null>(null);
    const [isParsing, setIsParsing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = async (file: File | null) => {
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            setStatus(AppStatus.ERROR);
            return;
        }

        setIsParsing(true);
        setError(null);
        setStatus(AppStatus.IDLE);
        setPdfFileName(file.name);
        setCvText('');

        try {
            const text = await extractTextFromPdf(file);
            setCvText(text);
        } catch (e) {
            setError('Failed to parse PDF. Please check the file or paste the text manually.');
            setStatus(AppStatus.ERROR);
            setPdfFileName(null);
        } finally {
            setIsParsing(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileSelect(e.target.files?.[0] || null);
        e.target.value = '';
    };

    const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, drag: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(drag);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        handleDragEvents(e, false);
        const file = e.dataTransfer.files?.[0] || null;
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleGenerate = async () => {
        if (!cvText.trim()) {
            setError('Please paste or upload your CV text into the box.');
            setStatus(AppStatus.ERROR);
            return;
        }
        setStatus(AppStatus.GENERATING);
        setError(null);
        try {
            const { profile } = await generateWebsiteContent(cvText);
            setProfileData(profile);
            setStatus(AppStatus.SUCCESS);
            navigate('/home');
        } catch (e) {
            const err = e as Error;
            setError(err.message);
            setStatus(AppStatus.ERROR);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">CV to Personal Site Generator</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Instantly create a beautiful portfolio and blog from your CV.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                        Curious about the person behind this project? Read a short author intro on my{' '}
                        <a
                            href="https://ficeskele.github.io/my-astro-site/about/"
                            className="text-blue-600 hover:underline dark:text-blue-400"
                            target="_blank"
                            rel="noreferrer"
                        >
                            blog page
                        </a>
                        .
                    </p>
                </div>

                <div className="mb-6">
                    <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Upload your CV
                    </label>
                    <div
                        onDragEnter={(e) => handleDragEvents(e, true)}
                        onDragLeave={(e) => handleDragEvents(e, false)}
                        onDragOver={(e) => handleDragEvents(e, true)}
                        onDrop={handleDrop}
                        className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 bg-gray-50 dark:bg-gray-700/50'}`}
                    >
                        <input
                            id="cv-upload"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={isParsing || status === AppStatus.GENERATING}
                        />
                        {isParsing ? (
                            <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                                <Loader className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                <span className="mt-2 font-medium">Parsing PDF...</span>
                            </div>
                        ) : (
                            <div className="text-gray-600 dark:text-gray-300 flex flex-col items-center">
                                <UploadCloudIcon className="w-10 h-10 mb-2 text-gray-400" />
                                <p className="font-semibold">Drag & drop your CV here</p>
                                <p className="text-sm">or <span className="text-blue-600 dark:text-blue-400 font-medium">click to upload</span></p>
                                <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">PDF format only</p>
                            </div>
                        )}
                    </div>
                    {pdfFileName && !isParsing && (
                        <div className="mt-2 text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/50 p-2 rounded-md">
                            Successfully extracted text from: <strong>{pdfFileName}</strong>
                        </div>
                    )}
                </div>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                </div>

                <div className="mb-6">
                    <label htmlFor="cv-text" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Paste or edit your CV text
                    </label>
                    <textarea
                        id="cv-text"
                        rows={15}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                        placeholder="Paste the full text from your CV here, or upload a PDF above..."
                        value={cvText}
                        onChange={(e) => setCvText(e.target.value)}
                        disabled={status === AppStatus.GENERATING || isParsing}
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleGenerate}
                        disabled={status === AppStatus.GENERATING || isParsing}
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
                    >
                        {status === AppStatus.GENERATING ? (
                            <>
                                <Loader className="-ml-1 mr-3 text-white" />
                                <span className="ml-2">Generating...</span>
                            </>
                        ) : '✨ Generate Site'}
                    </button>
                </div>
                
                {status === AppStatus.ERROR && error && (
                    <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
                        <p className="font-bold">An Error Occurred</p>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeneratorPage;
