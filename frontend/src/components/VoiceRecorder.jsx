import React, { useState, useRef } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const VoiceRecorder = ({ onSendVoiceMessage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success('Recording started');
    } catch {
      toast.error('Failed to access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      streamRef.current.getTracks().forEach(track => track.stop());
      toast.success('Recording stopped');
    }
  };

  const sendVoiceMessage = () => {
    if (audioBlob) {
      onSendVoiceMessage(audioBlob);
      setAudioBlob(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`btn btn-circle btn-sm ${isRecording ? 'btn-error' : 'btn-primary'}`}
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
      >
        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </button>
      {audioBlob && (
        <button
          onClick={sendVoiceMessage}
          className="btn btn-circle btn-sm btn-success"
          title="Send Voice Message"
        >
          <Send className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default VoiceRecorder;
