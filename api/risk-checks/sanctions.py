from http.server import BaseHTTPRequestHandler
import json
import os
from difflib import SequenceMatcher
from typing import List, Dict, Any

# Mock sanctions data - in production, this would be loaded from Supabase Storage
SANCTIONS_LISTS = {
    "OFAC": [
        {"name": "ACME CORP", "score": 90, "details": "OFAC SDN List"},
        {"name": "BAD COMPANY LLC", "score": 90, "details": "OFAC SDN List"},
        {"name": "SUSPICIOUS INC", "score": 90, "details": "OFAC SDN List"},
    ],
    "UN": [
        {"name": "TERRORIST GROUP", "score": 90, "details": "UN Sanctions List"},
        {"name": "ILLEGAL ENTITY", "score": 90, "details": "UN Sanctions List"},
    ],
    "EU": [
        {"name": "SANCTIONED COMPANY", "score": 90, "details": "EU Sanctions List"},
        {"name": "BLACKLISTED FIRM", "score": 90, "details": "EU Sanctions List"},
    ]
}

def calculate_similarity(name1: str, name2: str) -> float:
    """Calculate similarity between two names using fuzzy matching"""
    return SequenceMatcher(None, name1.lower(), name2.lower()).ratio()

def check_sanctions(vendor_name: str, threshold: float = 0.8) -> Dict[str, Any]:
    """Check vendor name against sanctions lists"""
    matches = []
    total_score = 0
    
    for list_name, entries in SANCTIONS_LISTS.items():
        for entry in entries:
            similarity = calculate_similarity(vendor_name, entry["name"])
            if similarity >= threshold:
                matches.append({
                    "name": entry["name"],
                    "list": list_name,
                    "score": entry["score"],
                    "similarity": similarity,
                    "details": entry["details"]
                })
                total_score += entry["score"]
    
    return {
        "matches": matches,
        "totalScore": min(total_score, 90),  # Cap at 90 for sanctions
        "status": "completed" if matches else "completed",
        "checked_at": "2024-01-01T00:00:00Z"  # In production, use actual timestamp
    }

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Parse request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            vendor_name = data.get('name', '')
            if not vendor_name:
                self.send_error_response(400, "Vendor name is required")
                return
            
            # Perform sanctions check
            result = check_sanctions(vendor_name)
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))
            
        except Exception as e:
            self.send_error_response(500, f"Internal server error: {str(e)}")
    
    def send_error_response(self, code: int, message: str):
        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        error_response = {"error": message}
        self.wfile.write(json.dumps(error_response).encode('utf-8'))
    
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
