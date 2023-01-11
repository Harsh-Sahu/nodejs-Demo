const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  Korn_Ferry_Reference_level: { type: String },
  Upper_decile90: { type: String },
  Upper_quartile75: { type: String },
  Median50: { type: String },
  Lower_quartile25: { type: String },
  Lower_decile10: { type: String },
  Average: { type: String },
  No_of_Incumbents: { type: String },
  No_of_Organizations: { type: String },
  Region: { type: String },
  UrbanRural: { type: String },
  Headcount: { type: String },
  Funding: { type: String },
  Thematic_Area: { type: String },
  Category: { type: String },
  Archetype: { type: String },
  Department: { type: String },
  Sub_department: { type: String },
});

module.exports = mongoose.model("Candidate", candidateSchema);
